import { expect, test } from '../src/fixture/fixture';
import { ProgramsPage } from '../src/page/Programspage';


test('Add New Program', async ({ staffPage }) => {

  const programsPage = new ProgramsPage(staffPage);

  await expect(programsPage.progElements.programMenu).toBeVisible()
  
  console.log('Programs menu is visible ');

  await programsPage.clickPrograms();
  
  console.log('clikced on Programs menu');
});
