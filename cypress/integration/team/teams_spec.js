// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// ***************************************************************
// - [number] indicates a test step (e.g. 1. Go to a page)
// - [*] indicates an assertion (e.g. * Check the title)
// - Use element ID when selecting an element. Create one if none.
// ***************************************************************

describe('Teams Suite', () => {
    beforeEach(() => {
        // 1. Login
        cy.login('user-1');
        cy.visit('/');
    });

    it('Create a new team', () => {
        const teamName = 'test team';

        // 1. Go to /
        cy.visit('/');

        // * check the initialUrl
        cy.url().should('include', '/ad-1/channels/town-square');

        // 2. open the dropdown menu
        cy.get('#sidebarHeaderDropdownButton').should('be.visible').click();

        // 3. click the create team
        cy.get('#sidebarDropdownMenu #createTeam').should('be.visible').click();

        // 4. type in team name
        cy.get('#teamDisplayName').type(teamName);

        // 5. click to submit display name
        cy.get('#submitDisplayName').should('be.visible').click();

        // 6. click to accept automatic team url
        cy.get('#submitTeamUrl').should('be.visible').click();

        // * Check the team name
        cy.get('#headerTeamName').should('contain', teamName);

        // * check the finalUrl
        cy.url().should('include', '/' + teamName.replace(' ', '-') + '/channels/town-square');
    });

    it('Cancel out of leaving a team', () => {
        // * check the team name
        cy.get('#headerTeamName').should('contain', 'eligendi');

        // * check the initialUrl
        cy.url().should('include', '/ad-1/channels/town-square');

        // 2. open the drop down menu
        cy.get('#sidebarHeaderDropdownButton').should('be.visible').click();

        // 3. click the leave team
        cy.get('#sidebarDropdownMenu #leaveTeam').should('be.visible').click();

        // * Check that the "leave team modal" opened up
        cy.get('#leaveTeamModal').should('be.visible');

        // 4. click on no
        cy.get('#leaveTeamNo').click();

        // * Check that the "leave team modal" closed
        cy.get('#leaveTeamModal').should('not.be.visible');

        // * check the team name
        cy.get('#headerTeamName').should('contain', 'eligendi');

        // * check the finalUrl
        cy.url().should('include', '/ad-1/channels/town-square');
    });
});
