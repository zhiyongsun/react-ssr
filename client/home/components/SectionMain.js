import React, {Component} from 'react';
import styles from '../sass/SectionMain';

import Main from './Main.ts';

class SectionMain extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <section className={styles.sectionMain}>
                Home
              <Main
                compiler="compiler"
                framework="framework"
              />
            </section>
        )
    }
}

export default SectionMain
