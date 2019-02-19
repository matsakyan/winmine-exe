import React, {useState} from "react"
import styled from "styled-components"
import {IconWithLabel, ApplicationIcon} from "~/components/_ui/DesktopIcon"
import Taskbar from "~/components/_ui/Taskbar/Taskbar"
import Minesweeper from "~/components/Minesweeper"
import About from "~/components/About"
import useEventListener from "~/lib/useEventListener"
import useTaskManager from "~/lib/useTaskManager"
import useWindowManager from "~/lib/useWindowManager"

const StyledDesktop = styled.div`
  display: grid;
  grid-auto-columns: 75px;
  grid-auto-rows: 75px;
  padding: 4px 0;
`

const icons = [
  <ApplicationIcon application={Minesweeper} />,
  <ApplicationIcon application={About} />,
  <IconWithLabel
    icon={require("~/components/About/images/github.png")}
    title="GitHub Repo"
    onOpen={() => window.open("https://github.com/1000hz/winmine-exe")}
  />,
]

const Desktop = () => {
  const [selected, setSelected] = useState()
  const {tasks, activeTask} = useTaskManager()
  const windows = useWindowManager(tasks, activeTask)

  const handleKeyUp = ({key}) => {
    switch (key) {
      case 'ArrowDown':
        selected < icons.length - 1 && setSelected(selected + 1)
        break
      case 'ArrowUp':
        selected > 0 && setSelected(selected - 1)
        break
    }
  }

  useEventListener(global.document, "contextmenu", e => e.preventDefault())

  return (
    <>
      <StyledDesktop
        onKeyUp={handleKeyUp}
      >
        {icons.map((element, i) => React.cloneElement(element,
          {
            isSelected: selected === i,
            key: i,
            onSelect: (select) => select ? setSelected(i) : setSelected(null)
          }
        ))}
        {windows}
      </StyledDesktop>
      <Taskbar tasks={tasks} activeTask={activeTask} />
    </>
  )
}

export default Desktop
