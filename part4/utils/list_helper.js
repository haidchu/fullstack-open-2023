const dummy = (blog) => {
    return 1
}

const totalLikes = (blogs) => {
    count = blogs.reduce((sum, item) => {
        return sum + item.likes
    }, 0)
    return count;
}

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((b, max) => {
        return b.likes > max.likes ? b : max
    }, blogs[0])
    return {
        "title": blog.title,
        "author": blog.author,
        "likes": blog.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}