import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth } from '../auth/decorators';
import { GetUser } from '../auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { query } from 'express';
import { GetPostId } from 'src/auth/decorators/get-post.decorator';
import { Post as PostEntity } from 'src/posts/entities';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Auth()
  @Post(':postId')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
    @GetPostId() postId: string,
  ) {
    return this.commentsService.create(createCommentDto, user, postId);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.commentsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term', ParseUUIDPipe) term: string, postId: string) {
    return this.commentsService.findOne(term, postId);
  }

  @Get('post/:postId')
  async findCommentsByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPostId(postId);
  }

  @Patch(':term/:postId')
  update(
    @Param('term', ParseUUIDPipe) term: string,
    @Param('postId') postId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(term, postId, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, postId: string) {
    return this.commentsService.remove(id, postId);
  }
}
