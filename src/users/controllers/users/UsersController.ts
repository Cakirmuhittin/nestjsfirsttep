import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';


@Controller('users')
export class UsersController {

    @Get()
    getUsers() {
        return { username: 'Anson', email: 'anson@anson.com' };
    }

    @Get('posts')
    getUsersPosts() {
        return [{
            username: 'Anson',
            email: 'anson@anson.com',
            posts: [
                {
                    id: 1,
                    title: 'Post 1',
                },
                {
                    id: 2,
                    title: 'Post 2',
                },
            ],
        },];
    }

    @Get('posts/comments')
    getUsersPostsComments() {
        return [{
            id: 1,
            title: 'Post 1',
            comments: [],
        },];
    }

    // @Post()
    // createUser(@Req() request: Request , @Res() response:Response){
    //   console.log(request.body); 
    //   response.send('Created');
    // }
    @Post('create')
    createUser(@Body() userData: CreateUserDto) {
        console.log(userData);
        return {}
    }

    @Get(':id/:postId')
    getUserById(@Param('id') id:string , @Param('postId') postId:string) {
        console.log(id);
        return { id,postId } 
    }
}
