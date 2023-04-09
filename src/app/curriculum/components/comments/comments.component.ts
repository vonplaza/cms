import { Component, Input, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  // @Input() comments:any

  addComment(commentForm: NgForm){
    
  }

  comments:Comment[] = [
    { 
      user_id: 1,
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
      curriculum_id: 1,
      curriculum_revision_id: null,
      status: 'a',
      id: 1
    },
    { 
      user_id: 1,
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
      curriculum_id: 1,
      curriculum_revision_id: null,
      status: 'a',
      id: 1
    },
    { 
      user_id: 1,
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
      curriculum_id: 1,
      curriculum_revision_id: null,
      status: 'a',
      id: 1
    },
    { 
      user_id: 1,
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
      curriculum_id: 1,
      curriculum_revision_id: null,
      status: 'a',
      id: 1
    },
    { 
      user_id: 1,
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
      curriculum_id: 1,
      curriculum_revision_id: null,
      status: 'a',
      id: 1
    },
    { 
      user_id: 1,
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, molestiae id! Impedit exercitationem aut quibusdam officiis unde! Dolorem laborum, doloremque esse, corporis blanditiis maxime accusamus eum dolor incidunt commodi vero?',
      curriculum_id: 1,
      curriculum_revision_id: null,
      status: 'a',
      id: 1
    },
  ]
}
