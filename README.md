﻿# bapi
Bowling score/group manager

**api calls

1. User
    - POST: /users/signup 
    - POST: /users/signin
    - POST/PUT/DELTE/GET: /users/:user_id
    - GET: /users/:user_id/groups 

    User Schema
    {
        name: { type: String, required: true },
        email: { type: String, lowercase: true, required: true },
        password: { type: String, required: true, select: false},
        groups: [{ type: ObjectId }],   //reference to user.groups
        scores: { type: ObjectId },     //reference to user.scores
        contacts: [{type: ObjectId}],    //reference to user.contacts
        description: { type: String }
    }

2. Group(League) management

    - POST: /groups/create
    - POST/PUT/DELETE: /groups/:group_id
    
    Group Schema
    {
        title: { type: String, required: true },
        owner: { type: String, required: true },
        owner_id: { type: String, required: true },
        description: String,
        users: ObjectId, //reference to group.users table
        created: Date,
        updated: Date,
    }





