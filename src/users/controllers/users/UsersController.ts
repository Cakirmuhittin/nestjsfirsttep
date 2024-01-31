import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';


@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {

    constructor(private userService: UsersService) {
    }

    // @Get()
    // getUsers(@Query('sortDesc',ParseBoolPipe) sortDesc:boolean) {      
    //     return { username: 'Anson', email: 'anson@anson.com' };
    // }

    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
        return this.userService.fetchUsers();
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
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
        console.log(userData.age.toPrecision());
        return this.userService.createUser(userData);

    }


    // @Get(':id/:postId')
    // getUserById(@Param('id') id: string, @Param('postId') postId: string) {
    //     console.log(id);
    //     return { id, postId }
    // }
    @Get(':id')
    getUserByIds(@Param('id', ParseIntPipe) id: number,) {
        console.log(id);
        return { id }
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.fetchUserById(id);
    }
}
