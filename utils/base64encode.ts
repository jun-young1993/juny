const base64Encode = (content: string) => {
    return Buffer.from(content,'base64').toString('utf-8')
}
export default base64Encode