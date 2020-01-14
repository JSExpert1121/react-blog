export const getErrorString = error => {
    if (typeof error?.data?.errors === 'string') {
        return error.data.errors
    } else {
        return 'Unknown Error'
    }
}