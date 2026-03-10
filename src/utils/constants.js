export const userRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project-admin",
    MEMBER: "member"
}

export const availableUserRole = Object.values(userRolesEnum)

export const taskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
}

export const availableTaskStatus = Object.values(taskStatusEnum)