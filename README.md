# bapi
api manage user's bowling score and bowling league

**api calls


1. User management
    Post
    a. /users/signup
    b. /users/signin
    ------ authorized users only ------
    c. /users/update
    Get
    d. /users/:id
        - display other user's information

    User Schema
    {
        id:String,
        name:String,
        email:String,
        password:String, //salt + hash,
        description:String,

        groups:[groupSchema],
        created:Date,
        modified:Date,

    }

2. Group(League) management
    
    Post
    a. /groups/create
    ------ group leaders only -------
    b. /groups/:gid/delete
    c. /groups/:gid/update
    d. /groups/:gid/add
    e. /groups/:gid/remove
    
    Get
    f. /groups/:gid
    g. /groups/:gid/rank
    h. /groups/:gid/users
    
    Group Schema
    {
        (id:)
        title:String,
        owner:String,
        owner_id:,
        created:Date,
        description:String,
        users: {
            name:String,
            id:Number,
            memberType:String,
            rating:Number,
        }
    }

-- next?
3. Score management

    Post
    a. /users/scores




