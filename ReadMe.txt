Create New folder and add to your VScode 
1. Openterminal (on your project ) run command -> 'npm init playwright@latest'
2. Crate folders PlaywrightFramework -> src -> fixture -> fixture.ts
3. To store constant values like (paths) created new file 'src-> constants -> paths
    NOTE: Here we are storing only floder paths like {json, csv & excel} and passing 
    the file name at the time of method call. 
4. Next we are creating a 'Basepage.ts' file under src -> page package, to create
generic method to read JSON, CSV & Excel files 
NOTE: while createing generic methods makes sure to install 
    -> npm install CSV
    -> npm instal xlsx and do import in Basepage
5. Created ENUMs to avoid typo errors 
6. 





