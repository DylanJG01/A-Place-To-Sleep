import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

export default function DeleteSpotModal(){
    const dispatch = useDispatch();


    return (
        <>
            <h1>This is a DeleteSpotModal</h1>
        </>
    )
}