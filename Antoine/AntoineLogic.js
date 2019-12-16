import React, { PureComponent } from 'react';
import TextContainer from './TextContainer';
// import withObservables from '@nozbe/with-observables'


export default class TextLogin extends PureComponent  {
render() {
return <TextContainer {...this.props} />
}
}



// const enhance = withObservables(['search'], ({ database, search }) => ({
//     blogs: database.collections 
//      .get('blogs')
//       .query(Q.where('name', Q.like(`%${Q.sanitizeLikeString(search)}%`))),
//       post: post.observe(),
//       comments: post.comments.observe(),
//   }))

//   export default enhance(TextLogin)