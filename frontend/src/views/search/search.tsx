import { Accordion, useAccordionButton, Form } from "react-bootstrap";
import "./search.css";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";
import { CavokButton } from "components/cavok-colored";

interface DropdownFilterProps {
    title: string;
    options?: string[];
    selected?: string;
    onChange?: (value: string) => void;
}

const DropdownFilter = (props: DropdownFilterProps) => {
    const onClick = useAccordionButton(props.title, () => {
        console.log("clicked");
    });

    return (
        <>
            <div className="filter-content-item" onClick={onClick}>
                <h6>{props.title}</h6>
                <DropdownIcon size={25} />
            </div>
            <Accordion.Collapse eventKey={props.title}>
                <Form.Check>Gol</Form.Check>
            </Accordion.Collapse>
        </>
    );
};

export default function Search() {
    return (
        <div className="search">
            <div className="search-header">
                <h3>header</h3>
            </div>
            <div className="search-body">
                <Accordion alwaysOpen className="side-bar-filter">
                    <div className="filter">
                        <div className="filter-title">
                            <h3>Filtros</h3>
                        </div>
                        <hr />
                        <div className="filter-content">
                            <DropdownFilter title="Paradas" />
                            <hr />
                            <DropdownFilter title="Companhia" />
                            <hr />
                            <DropdownFilter title="Preço" />
                        </div>
                    </div>
                </Accordion>
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
