exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First secret', content: 'This is the secret diary to share!' }]
    })
}

exports.createPost = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    res.status(201).json({
        message: 'Secret diary post created successfully',
        post: { id: new Date().toISOString(), title: title, content: content }
    })
}