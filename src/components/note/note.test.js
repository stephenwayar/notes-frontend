import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from './note.component'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // render(<Note note={note} />) 
  
  // const element = screen.getByText('Component testing is done with react-testing-library')
  // expect(element).toBeDefined()

  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)


  // const { container } = render(<Note note={note} />)

  // screen.debug(container)

  // const div = container.querySelector('.note')
  // expect(div).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // )
})