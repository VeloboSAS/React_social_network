import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer"

let state = {
    posts:  [
        { id: 1, message: "Hi, how are you?", likesCount: 15},
        { id: 2, message: "It's my first post", likesCount: 10},
        { id: 3, message: "Oups", likesCount: 1},
        { id: 4, message: "Oupsss", likesCount: 12},
      ],

}

test('lengt of posts should be incremented', () => {
    //1.start data
    let action = addPostActionCreator("it-kamasutra.com")

    //2. action
    let newState = profileReducer(state, action);

    //3.expettation
    expect(newState.posts.length).toBe(5);

  })

  test('message of new post should be correct', () => {
    //1.start data
    let action = addPostActionCreator("it-kamasutra.com")

    //2. action
    let newState = profileReducer(state, action);

    //3.expettation

    expect(newState.posts[4].message).toBe("it-kamasutra.com");
  })

  test('after deliting length of messages should be decrement', () => {
    //1.start data
    let action = deletePost(1)

    //2. action
    let newState = profileReducer(state, action);

    //3.expettation
    expect(newState.posts.length).toBe(3);

  })

  test(`after deliting length  shouldn't  be decrement if id is incorrect`, () => {
    //1.start data
    let action = deletePost(1000)

    //2. action
    let newState = profileReducer(state, action);

    //3.expettation
    expect(newState.posts.length).toBe(4);

  })
