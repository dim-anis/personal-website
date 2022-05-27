import * as React from "react";

import PostPreview from "../components/postPreview";
import Main from "../components/main";
import Layout from "../components/layout"

const projects = [
    {
        name: "TG Workout Bot",
        link: "https://github.com/dim-anis/tg-workout-tracker",
        description: "A workout tracker based on Telegram's BotAPI."
    },
    {
        name: "TG Workout Bot Dashboard",
        link: "https://github.com/dim-anis/tg-workout-tracker-dashboard",
        description: "Simple React/Express Dashboard for 'tg-workout-tracker' Telegram Bot."
    },
    {
        name: "Pizza Calculator",
        link: "https://github.com/dim-anis/pizza-calculator",
        description: "Simple react/styled-components pizza dough calculator. No more need to guess the ingredients proportions for consistent results!"
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
                            description={item.description}
                            regularLink={true}
                            to={item.link}
                        />
                    ))
                }
            </Main>
        </Layout>
    )
}

export default Projects;