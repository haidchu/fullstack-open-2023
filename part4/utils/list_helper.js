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

const mostBlogs = (blogs) => {
    const authorCount = blogs.reduce((count, blog) => {
        count[blog.author] = (count[blog.author] || 0) + 1
        return count
    }, {})

    const result = Object.entries(authorCount).reduce((max, [author, blogs]) => {
        return blogs > max.blogs ? { author, blogs } : max
    }, { author: null, blogs: 0 })
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}