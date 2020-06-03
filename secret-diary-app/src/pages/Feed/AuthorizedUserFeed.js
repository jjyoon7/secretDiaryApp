import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Feed from './Feed'
import SinglePostPage from '../Feed/SinglePost/SinglePost'

const AuthorizedUserFeed = ({userId, token}) => {
    return (
        <Switch>
            <Route path="/" exact>
                <Feed userId={userId} token={token} />
            </Route>
            
            <Route path="/:postId">
              <SinglePostPage userId={userId} token={token}/>
            </Route>
            
            <Redirect to="/" />
        </Switch> 
    )
} 

export default AuthorizedUserFeed