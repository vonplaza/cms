import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment'
import { NgForm } from '@angular/forms';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnChanges, OnInit{
  constructor(private commentService: CommentService){}

  // @Input() comments:any
  @Input() type: string = ''
  @Input() action: string = ''
  @Input() role: string = 'reviewer'
  
  @Input() comments: Comment[] = []
  @Output() addComment = new EventEmitter()

  height:number = 700

  comment = {
    subject: '',
    body: ''
  }

  ngOnInit(): void {
    this.commentService.commentSuccess.subscribe(
      data => {
        this.comment.subject = ''
        this.comment.body = ''
      }
    )
  }

  ngOnChanges(){
    if(this.type == 'view' && this.role == 'reviewer') 
      this.height = 450
  }

  submit(commentForm: NgForm){
    this.addComment.emit(commentForm.value)
  }

  // comments:Comment[] = [
  //   { 
  //     user_id: 1,
  //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
  //     curriculum_id: 1,
  //     curriculum_revision_id: null,
  //     status: 'a',
  //     id: 1
  //   },
  //   { 
  //     user_id: 1,
  //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
  //     curriculum_id: 1,
  //     curriculum_revision_id: null,
  //     status: 'a',
  //     id: 1
  //   },
  //   { 
  //     user_id: 1,
  //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
  //     curriculum_id: 1,
  //     curriculum_revision_id: null,
  //     status: 'a',
  //     id: 1
  //   },
  //   { 
  //     user_id: 1,
  //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
  //     curriculum_id: 1,
  //     curriculum_revision_id: null,
  //     status: 'a',
  //     id: 1
  //   },
  //   { 
  //     user_id: 1,
  //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
  //     curriculum_id: 1,
  //     curriculum_revision_id: null,
  //     status: 'a',
  //     id: 1
  //   },
  //   { 
  //     user_id: 1,
  //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
  //     curriculum_id: 1,
  //     curriculum_revision_id: null,
  //     status: 'a',
  //     id: 1
  //   },
  // ]
}
