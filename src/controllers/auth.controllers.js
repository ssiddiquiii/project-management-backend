import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { emailVerificationMailgenContant, sendEmail } from "../utils/mail.js";

/**
 * Generate access and refresh tokens for authenticated user
 * @param {string} userID - User ID
 * @returns {Object} { accessToken, refreshToken }
 */
const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate JWT tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation failed:", error);
    throw error instanceof ApiError
      ? error
      : new ApiError(500, "Failed to generate tokens");
  }
};

/**
 * Register a new user with email verification
 * - Validates input fields
 * - Normalizes and checks for duplicates
 * - Creates user and sends verification email
 * @param {Object} req - Express request with body: { email, username, password, fullName }
 * @param {Object} res - Express response
 */
const registerUser = asyncHandler(async (req, res) => {
  // 1. Extract and validate required fields
  const { email, username, password, fullName } = req.body;

  if (!email || !username || !password || !fullName) {
    throw new ApiError(
      400,
      "Email, username, password, and fullName are required",
    );
  }

  // 2. Normalize inputs (lowercase, trim whitespace)
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedUsername = username.toLowerCase().trim();

  // 3. Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
  });

  if (existedUser) {
    const field = existedUser.email === normalizedEmail ? "email" : "username";
    throw new ApiError(409, `User with this ${field} already exists`);
  }

  // 4. Create new user (password auto-hashed by schema)
  const user = await User.create({
    email: normalizedEmail,
    password,
    username: normalizedUsername,
    fullName,
    isEmailVerified: false,
  });

  // 5. Generate and store email verification token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  // 6. Send verification email
  try {
    await sendEmail({
      email: user.email,
      subject: "Please verify your email",
      mailgenContent: emailVerificationMailgenContant(
        user.username,
        `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
      ),
    });
  } catch (emailError) {
    console.error("Verification email send failed:", emailError);
    throw new ApiError(
      500,
      "Failed to send verification email. Please try registering again.",
    );
  }

  // 7. Return created user (without sensitive fields)
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to complete user registration");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        "User registered successfully. Verification email has been sent.",
      ),
    );
});

export { registerUser };
