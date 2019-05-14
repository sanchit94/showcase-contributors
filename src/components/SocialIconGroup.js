import React from 'react';
import { Icon } from 'semantic-ui-react';

// const styles = {
//     fb: {
//         backgroundColor: "#4b70ab"
//     },
//     twitter: {
//         backgroundColor: "#32b9e7"
//     },
//     google: {
//         backgroundColor: "#fa5432"
//     }
// }

export default function() {
    return(
        <div className="block-centered">
            <Icon circular inverted size="large" name="facebook f" />
            <Icon circular inverted size="large" name="twitter" />
            <Icon circular inverted size="large" name="google" />
        </div>
    );
}

