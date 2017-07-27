export class Poll {
      _id: any;
    question: String;
    options={
        1:{
            content: "",
            votes: 0
        },
        2:{
            content: "",
            votes: 0
        },
        3: {
            content: "",
            votes: 0
        },
        4: {
            content: "",
            votes: 0
        },
    }
    _creator: any;
    votes=0
    createdAt: Date;
    updatedAt: Date;
}
