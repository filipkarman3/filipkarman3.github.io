const Entries = [
    {
      title: "Developing a backwards-compatible, secure ARP protocol variant",
      date: "2025/08/13",
      content: "As we come to the deadline of our university-funded research project, my teammate and I are finishing up our proof-of-concept implementations of a secure ARP protocol variant. Formal education failed to convert the concept of network communication into anything less nebulous, but this project has done me a great deal of good in understanding the kinks of the whole network stack and how and why protocols work. It's also led me down some interesting rabbit holes such as Quadrature Amplitude Modulation! The project isn't publicly on my github just yet but should be soon."
    },
    {
      title: "2025 Great Warwick Game Jam",
      date: "2025/07/05",
      content: "Last summer, I spent a decent chunk of my time building a user-friendly wrapper around Haskell's SDL2 bindings because nobody wants to manage sprite pointers and the like. I finally had an opportunity to put the \"\"engine\"\" to good use during this year's game jam. I teamed up with probably the only other person that was interested in making a game in Haskell and had lots of fun craning our brains to neatly implement things like a time-rewind mechanism in a paradigm that we weren't 100% comfortable with. Though we \"finished\" the game within the two-week deadline, we continued creating puzzle levels for each other for a while after. Try the game yourself! It's on my github: https://github.com/filipkarman3/gaeme"
    },
    {
        title: "Solving Sudoku using SAT",
        date: "2025/06/27",
        content: "This year we covered several SAT solving algorithms and their associated optimisations, such as CDCL and DPLL. Seeing as Sudoku is NP-complete (well, a fixed board size is theoretically but impractically O(1)),  I thought it would be interesting to construct an algorithm to reduce Sudoku to SAT and take advantage of the already-existing implemented SAT-solving algorithms. Haskell was the language of choice for this task due to its fair computational speed and excellent list comprehension capabilities. Since many of the resultant clauses were very similar to each other, list comprehension was used as a shorter and more legible alternative to for loops when generating them. You can check out the project on my github! (https://github.com/filipkarman3/sudoku-sat-haskell)"
    },
    {
        title: "We're so back",
        date: "2025/06/23",
        content: "Summer has began for me, and I've used the first bit of it to bring this blog up to scratch. Hopefully I'll get to cranking out some entries over what I've been up to recently within the next few days."
    },
    {
        title: "The blog is live!",
        date: "2024/03/12",
        content: "Hi! I'll be using this to document anything interesting I do within the world of computer science. This is my first time using ReactJS, so there's like three things I haven't figured out how to automate and I have to update them every time I want to make a new post. I might fix that someday, but learning this new library has angered me enough already, so that won't be happening for at least a while."
    }
]

export default Entries;
