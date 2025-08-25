import { Link } from 'react-router'
export default function Abstract() {
    return (
        <div className='col-12 col-md-6'>
            <div className="row">
                <div className='col-6 text-center'>
                    <img className='img-fluid rounded' src={'https://i.imgur.com/cgaG4QM.jpeg'} alt='Intro' />
                </div >
                <div className='col-6'>
                    <p className='abstract-text'>
                        Hi! My name is Andrew.<br />
                        I'm a software engineer.<br />
                        In this blog I will be discussing such topics as; personal development, technology, anecdotes and unfinished thoughts.<br />
                        I like systems thinking: Create a model of the problem and solve it from there.<br />
                        Though I think rigid formats are bad, an ideal article will try to answer a question.<br />
                        The question is in the title, the answer is in the prose.<br />
                    </p>
                    <Link to='about'><button className="btn btn-info">More About Me</button></Link>
                </div >
            </div>
        </div>
    );
}