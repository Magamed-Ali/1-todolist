import React, {useEffect, useState} from 'react';

export function Footer() {
    var newDate = new Date().toLocaleDateString();


    return (
        <div className="footer">
            <div>© {newDate} Copyright Text</div>

            <div>
                Link: <a href="https://github.com/Magamed-Ali/1-todolist">GitHab project</a>
            </div>

            <div className="footer-line"></div>
        </div>
    );
}