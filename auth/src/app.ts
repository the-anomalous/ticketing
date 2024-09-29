import express from 'express'
import 'express-async-errors'
import 'tsconfig-paths/register';

import {json} from 'body-parser'
import cookieSession from 'cookie-session'
import {currentUserRouter} from '@/routes/current-user.route'
import { signinRouter } from '@/routes/signin.route'
import { signoutRouter } from '@/routes/signout.route'
import { signupRouter } from '@/routes/signup.route'

import {errorHandler} from '@ad-tickets/commonlib';
import {NotFoundError} from '@ad-tickets/commonlib';

const app = express() 

app.set('trust proxy', true) 
app.use(cookieSession({
    signed:false,
    secure: false
}))
app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export {app}