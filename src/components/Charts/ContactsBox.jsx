import React from "react";
import { Col, Row } from "react-bootstrap";

export default function ContactsBox({ isSuperAdmin, data }) {
    return isSuperAdmin ? (
        <div className="contacts-box-container">
            <div className="contact-box">Box 1</div>
            <div className="contact-box">Box 2</div>
            <div className="contact-box">Box 3</div>
            <div className="contact-box">Box 4</div>
            <div className="contact-box">Box 5</div>
        </div>
    ) : (
        <>
            <Row className="justify-content-center mb-1 ">
                <Col xs={3} className="contact-box2 bg-warning rounded p-2 text-white text-center ">
                    DIV ({data.division})
                </Col>
            </Row>
            <Row className="justify-content-center mb-1">
                <Col xs={6} className="contact-box2 bg-yellow rounded p-2 text-white text-center">
                    RC / ARC ({data.rcarc})
                </Col>
            </Row>
            <Row className="justify-content-center mb-1" >
                <Col xs={9} className="contact-box2 bg-purple rounded p-2 text-white text-center">
                    CENTERS ({data.centers})
                </Col>
            </Row>
            <Row className="justify-content-center mb-1">
                <Col xs={12} className="contact-box2 bg-success rounded p-2 text-white text-center">
                    CENTER COORDINATORS ({data.cc})
                </Col>
            </Row>
        </>
    );
}
