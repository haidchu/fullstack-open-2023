const dummy = (blog) => {
    return 1
}

const totalLikes = (blogs) => {
    count = blogs.reduce((sum, item) => {
        return sum + item.likes
    }, 0)
    return count;
}

module.exports = {
    dummy,
    totalLikes
}