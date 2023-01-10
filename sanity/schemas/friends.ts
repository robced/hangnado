export default {
    name: "friends",
    title: "Friends",
    type: "object",
    fields: [
        {
            name : "source",
            title: "Source",
            type: "reference",
            to: [{type: "user"}],
        },
        {
            name : "target",
            title: "Target",
            type: "reference",
            to: [{type: "user"}],
        }
    ]
}