export const secret = new Buffer(process.env.SECRET || 'secret', 'base64')
export const users = JSON.parse(process.env.USERS) || []
