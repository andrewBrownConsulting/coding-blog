export default function AboutMe() {
    document.title = "About Me"
    return (
        <><div className="container ">
            <p>
                Born in Newcastle Upon Tyne, England.
            </p>
            <p>
                Hobbies: Sailing, Skiing,
            </p>

            <div className="row">
                <h1>Work History</h1>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div className="col">
                    <div className="card p-2" href='https://kinewell.co.uk'>
                        <img className='card-img' src='/windfarm.png' />
                        <p className='date'>2024-2025</p>
                        <div className="card-body">
                            <h3 className="card-title">Kinewell</h3>
                            <p className="">
                                Wind Farm rptimisiation Software

                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card p-2" href='https://www.cadence.com'>
                        <img className='card-img' src='/integratedCircuit.png' />
                        <p className='date'>2022-2024</p>
                        <div className="card-body">
                            <h3 className="card-title">Cadence Design Systems</h3>
                            <p>
                                Electronic Design Automation Routing Software
                            </p>
                            <p>
                                Worked on Unity Engine, a router plugin for The Cadence Virtuoso Suite.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card p-2" href='https://www.physics.manchester.ac.uk'>
                        <img className='card-img' src='/uom.png' />
                        <p className='date'>2018-2022</p>
                        <div className="card-body">
                            <h3 className="card-title">Master of Physics - University of Manchester</h3>
                            <p className="">
                                EDA Routing Software
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}