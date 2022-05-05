import * as React from "react";
//import styled from "styled-components";
import PostPreview from "../components/postPreview";
import Main from "../components/main";
import Layout from "../components/layoutMain"

const projects = [
    {
        name: "TG Workout Bot",
        link: "https://github.com/dim-anis/tg-workout-tracker"
    },
    {
        name: "TG Workout Bot Dashboard",
        link: "https://github.com/dim-anis/tg-workout-tracker-dashboard"
    },
    {
        name: "Pizza Calculator",
        link: "https://github.com/dim-anis/pizza-calculator"
    },

]

const Projects = () => {
    return (
        <Layout pageTitle="Projects">
            <Main title="Projects">
                {
                    projects.map((item) => (
                        <PostPreview
                            title={item.name}
                            description="some description"
                            to={item.link}
                        />
                    ))
                }
            </Main>
        </Layout>
    )
}

export default Projects;