export default function ProductNavigation() {
    return (
        <div className='project-navigation' data-aos='fade-up' data-aos-delay='200'>
            <div className='nav-container'>
                <a href='#' className='nav-item prev'>
                    <span className='nav-label'>Previous Project</span>
                    <span className='nav-title'>Mobile Banking App</span>
                </a>
                <a href='#' className='nav-item center'>
                    <i className='bi bi-grid'></i>
                    <span>View All</span>
                </a>
                <a href='#' className='nav-item next'>
                    <span className='nav-label'>Next Project</span>
                    <span className='nav-title'>E-learning Platform</span>
                </a>
            </div>
        </div>
    );
}
