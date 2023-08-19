import "./search.css";

export default function Search() {
    return (
        <div className="search">
            <div className="search-header">
                <h3>header</h3>
            </div>
            <div className="search-body">
                <div className="side-bar-filter">
                    <div className="filter">
                        <div className="filter-title">
                            <h3>Filtros</h3>
                        </div>
                        <hr />
                        <div className="filter-content">
                            <div className="filter-content-item">
                                <h6>Paradas</h6>
                            </div>
                            <hr />
                            <div className="filter-content-item">
                                <h6>Companhia</h6>
                            </div>
                            <hr />
                            <div className="filter-content-item">
                                <h6></h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-result">
                    <div className="search-result-title">
                        <h3>Search Result</h3>
                    </div>
                    <div className="search-result-content"></div>
                </div>
            </div>
        </div>
    );
}
