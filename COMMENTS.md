**What did you think of the assignment?**

I found the assignment quite straightforward overall. I particularly enjoyed creating a form library hook inspired by `react-hook-form`. You can see my implementation in `useFormValues.tsx`.

**Which part did you consider the most difficult, or did you spend most of your time on?**

None of the parts were particularly difficult. The main challenge was data fetching, but I spent most of my time developing the form to function like a state-management library without any re-renders etc and it's extendable.

**Which parts were you not able to fully implement?**

Unfortunately, I didn't have enough time to write unit tests. I think the rest is covered.

**What would you add or improve if you had more time?**

If I had more time, I would review my code to consider scalability and future extensions. I think about of component separation and project structure, and I would like to add more features, such as additional styles for reusable components.

**What would you do differently if it was a bigger application?**

For a larger application, I believe the current structure and component design are scalable. However, I would add more styles and variants to each component, such as `<Select variant="solid" />` or `<Select variant="outline" />`. Given the simplicity of this project, focusing primarily on data fetching, a more complex project would benefit from using a state-management library. Keeping the business logic outside of the components makes debugging easier, reduces bugs, and simplifies testing. The choice of state management library would depend on the project's specific needs.
