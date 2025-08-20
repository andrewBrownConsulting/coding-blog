export default function Abstract() {
    return (
        <section id='intro' className='row justify-content-center'>
            <div className='col-12 col-sm-4 text-center'>
                <img className='img-fluid rounded' src={'https://i.imgur.com/cgaG4QM.jpeg'} alt='Intro' />
            </div >
            <div className='col-12 col-sm-8'>
                <h1>Welcome to my Blog!</h1>
                <p>Hi! My name is Andrew.</p>
                <p>I'm a software engineer.</p>
                <p>This is my personal blog.</p>
                <p>In this blog I will be discussing such topics as; personal development, technology, anecdotes and unfinished thoughts.</p>
                <p>I like systems thinking: Create a model of the problem and solve it from there.</p>
                <p>Though I think rigid formats are bad, an ideal article will try to answer a question.</p>
                <p>The question is in the title, the answer is in the prose.</p>
            </div>
        </section >
    )
}