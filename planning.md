User Scenario

As a user I will begin by entering my email, so I can get the results.

I will then enter the question to be voted on by me and my friends.

I will then enter at least 3 choices for my friends to rank.

I will then enter the email addresses of all those whom I want to poll.

Once all fields are complete, I will click the submit button to send out poll.

All people on email list will recieve link with poll-code attached.

All will enter code on webpage and then they will enter their rankings.

After each submission, I will get an email update of the current vote outcome.

STRETCH =====>>>> I am able to add an extra email row

STRETCH =====>>>> I can see detailed poll results

STRETCH =====>>>> Build user profiles with secure login

STRETCH =====>>>> See graphical representation of voting results

ERD

------------------------ questions_TABLE ----------------------------------

| id SERIAL PK | name VARCHAR(255) | description (TEXT) | poll_id (FK)

------------------------ choices_TABLE ------------------------------------

| id SERIAL PK | questions_id (FK) | points | user_name

------------------------ polls_TABLE --------------------------------------

------------------------ VOTERS_TABLE --------------------------------------
|||| voters_id |||| poll_code |||| voter_email
.
