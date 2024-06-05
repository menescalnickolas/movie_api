const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());

let movies = [
    {
        'title': 'Neon Demon',
        'year': '2016',
        'synopsis': 'Jesse (Elle Fanning) moves to Los Angeles just after her 16th birthday to launch a career as a model. The head of her agency tells the innocent teen that she has the qualities to become a top star. Jesse soon faces the wrath of ruthless vixens who despise her fresh-faced beauty. On top of that, she must contend with a seedy motel manager and a creepy photographer. As Jesse starts to take the fashion world by storm, her personality changes in ways that could help her against her cutthroat rivals.',
        'genre': {
            'name': 'Psychological Thriller',
            'description': 'In terms of context and convention, it is a subgenre of the broader ranging thriller narrative structure, with similarities to Gothic and detective fiction in the sense of sometimes having a "dissolving sense of reality". It is often told through the viewpoint of psychologically stressed characters, revealing their distorted mental perceptions and focusing on the complex and often tortured relationships between obsessive and pathological characters.'
        },
        'director': {
            'name': 'Nicolas Winding Refn',
            'bio': 'Nicolas Winding Refn (born 29 September 1970) is a Danish film director, screenwriter, and producer. He found great success early in his career directing the Pusher trilogy (1996–2005), the crime drama Bronson (2008), and the adventure film Valhalla Rising (2009). In 2011 he gained newfound stardom directing the action drama film Drive (2011) for which he won the Cannes Film Festival Award for Best Director. He was also nominated for the BAFTA Award for Best Direction. Refn\'s next films were the stylistically driven action film Only God Forgives (2013), and the psychological horror film The Neon Demon (2016).'
        }
    },
    {
        'title': 'Challengers',
        'year': '2024',
        'synopsis': 'Tashi, a tennis player turned coach, has transformed her husband from a mediocre player into a world-famous grand slam champion. To jolt him out of his recent losing streak, she makes him play a challenger event -- close to the lowest level of tournament on the pro tour. Tensions soon run high when he finds himself standing across the net from the once-promising, now burnt-out Patrick, his former best friend and Tashi\'s former boyfriend.',
        'genre': {
            'name': 'Sports Drama',
            'description': 'The "Sports Drama" subgenre combines the competitive and emotional elements of sports with the personal and relational tensions of drama and romance. It typically features athletes facing both personal and professional challenges, with a significant focus on their romantic relationships and the impact of their sports careers on these relationships. The narrative often explores themes of love, perseverance, and personal growth, set against the backdrop of the sports world.',
        },
        'director': {
            'name': 'Luca Guadagnino',
            'bio': 'Luca Guadagnino is an Italian film director and producer. His films are characterized by their emotional complexity, eroticism, and sumptuous visuals.'
        }
    },
    {
        'title': 'Clue',
        'year': '1985',
        'synopsis': 'Six blackmail victims are invited to an isolated mansion by a man who knows a dark secret from each of their pasts. On arrival, each is given a pseudonym drawn from Cluedo before being introduced to the blackmailer. Each is handed a weapon, at which point the lights are switched off and the blackmailer is killed. Can the guests uncover the murderer before they all become victims?',
        'genre': {
            'name': 'Whodunnit',
            'description': 'The "whodunnit" genre is a type of mystery that revolves around solving a crime, typically a murder, by uncovering the identity of the perpetrator. The plot usually follows a detective or amateur sleuth who gathers clues, interrogates suspects, and pieces together evidence to reveal the culprit. This genre emphasizes suspense, logical deduction, and often features red herrings and unexpected twists to keep the audience guessing until the final revelation.',
        },
        'director': {
            'name': 'Jonathan Lynn',
            'bio': 'Jonathan Adam Lynn is an English stage and film director, producer, writer, and actor. He directed the comedy films Clue, Nuns on the Run, My Cousin Vinny, and The Whole Nine Yards. He also co-created and co-wrote the television series Yes Minister.'
        }
    },
    {
        'title': 'Easy A',
        'year': '2010',
        'synopsis': 'Prompted by her popular best friend to spill details of her boring weekend, Olive, a clean-cut teen, decides to spice things up by telling a little lie about losing her virginity; when the high-school busybody overhears the conversation and spreads it all over campus, Olive is suddenly notorious but for the wrong reasons.',
        'genre': {
            'name': 'Comedy',
            'description': 'Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter.',
        },
        'director': {
            'name': 'Will Gluck',
            'bio': 'Will Gluck is the Golden Globe-nominated writer/director/producer known for Easy A (2010), Friends with Benefits (2011), Annie (2014), the Peter Rabbit (2018) movies, and a number of TV shows including Woke (2020), Chicago Party Aunt (2021), and The Michael J. Fox Show (2013). He runs the production company Olive Bridge Entertainment which has production deals with Sony Pictures and wiip. Born in New York City, he now resides in Los Angeles with his family.'
        }
    },
    {
        'title': 'The Royal Tenembaums',
        'year': '2001',
        'synopsis': 'The Tenenbaums are a talented family of former child prodigies. However, they are not on the best of terms. When their ailing father summons them all, they find themselves under one roof.',
        'genre': {
            'name': 'Family Drama',
            'description': 'Family dramas contrast with other forms of drama like Legal Drama and Political Drama in that their conflicts are often a result of personal, family events, like marriages, the death of loved ones or dysfunctional family members, rather than a more grand, general background as in the aforementioned forms of drama.',
        },
        'director': {
            'name': 'Wes Anderson',
            'bio': 'Wesley Wales Anderson is an American filmmaker. His films are known for their eccentricity, distinctive visual and narrative styles, and frequent use of ensemble casts. With themes of grief, loss of innocence, and dysfunctional families, critics have cited Anderson as an auteur.'
        }
    },
    {
        'title': 'The Help',
        'year': '2011',
        'synopsis': 'Skeeter Phelan, an author in the making, embarks upon a writing project that voices the opinion and point of view of African-American house helps during the 1960s. Her project is met with disapproval.',
        'genre': {
            'name': 'Period Drama',
            'description': 'A historical drama (also period drama, period piece or just period) is a dramatic work set in a past time period, usually used in the context of film and television, which presents historical events and characters with varying degrees of fictional elements such as creative dialogue or fictional scenes which aim to compress separate events or illustrate a broader factual narrative. ',
        },
        'director': {
            'name': 'Tate Taylor',
            'bio': 'Tate Taylor is an American filmmaker and actor. Taylor is best known for directing The Help, Get On Up, and The Girl on the Train.'
        }
    }
]

let users = [
    {
        id: 1,
        name: "Nickolas",
        favoriteMovies: ['Neon Demon']
    }
]

// Create New User (CREATE)
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Users need names.')
    }
});

// Update User Info (UPDATE)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('No user found.');
    }
});

// Add Movie To List of Favorites (CREATE)
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
    } else {
        res.status(400).send('No user found.');
    }
});

// Remove Movie From List of Favorites (DELETE)
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
    } else {
        res.status(400).send('No user found.');
    }
});

//Allow Users To De-Register (DELETE)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} has been deleted.`);
    } else {
        res.status(400).send('No user found.');
    }
});



// Get ALL Movies (READ)
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// Get data of a single movie by title (READ)
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send("Movie not found!");
    }
});

// Get data of a GENRE by genre title (READ)
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send("Genre not found!");
    }
});

// Get data of a DIRECTOR by their name (READ)
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send("Director not found!");
    }
});





app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});