1. What worked well in this project (what was easy/straightforward)?
2. What didn't work well (what was difficult to understand or parse)?
3. What changes would you make to this project now that it's deployed?
4. What would you improve and/or add to this project now that it's deployed?

<ol>
<li>
What worked well was setting up the todolist. It was easy since it was demonstrated in class. It was easy to set up the environment with Vercel and deploy with Vercel. I just had to link it to my github and choose the folder I wanted the app to deploy from.
</li>
<li>
I wanted the user to be able to edit the list anytime and have it stored immediately. I spent way too much time on that. It made my program laggy when I update the state of my array every time the user types in anything. What I did to solve this was to make a local state that only stores strings. It would update on change, so every time a user typed something, it would update the state of the string. Then I updated the array on blur with the local state.
</li>

<li>
What I would change is maybe use an array of objects instead of a simple array of strings. I had problems removing items with the same exact string. I think next time I would make the array of object like this {id: randomNum, todo: string}.
</li>

<li>
What I would improve on this project now that it’s deployed is to spend more time reading Next’s Js documentation because they use a different router than the react router. I was also stuck on this process for a long time and it wasn’t routing correctly. Turns out I just needed to clear the cache in the .next folder and rerun npm run dev. I also needed to learn about their client side and server side rendering because I had troubles with that.
</li>
</ol>
