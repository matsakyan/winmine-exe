import React, {useState, useEffect, useRef} from "react"
import styled from "styled-components"
import Text from "~/components/_ui/Text"
import ditherBackground from "~/lib/ditherBackground"
import useTaskManager from "~/lib/useTaskManager"

const StyledIconWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 0;
`

const Icon = styled.div`
  display: block;
  width: 32px;
  height: 32px;
  flex: none;
  background-image: url(${props => props.src});
  background-size: 32px;

  :after {
    ${props => (props.isSelected ? `content: ""` : undefined)};
    display: block;
    width: 32px;
    height: 32px;
    mask-image: ${props => `url(${props.src})`};
    mask-size: 32px 32px;
    ${props => ditherBackground(props.theme.colors.navy)};
  }
`

const Label = styled(Text)`
  position: relative;
  display: inline-block;
  color: ${props => props.theme.colors.gray[3]};
  background: ${props => (props.isSelected ? props.theme.colors.navy : "transparent")};
  margin: 4px;
  padding: 2px;
  padding-top: 1px;
  padding-left: 3px;
  text-align: center;
  max-width: 75px;

  :after {
    ${props => (props.isSelected ? `content: ""` : undefined)};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px dotted ${props => props.theme.colors.yellow};
  }
`

export const IconWithLabel = ({icon, title, isSelected, onSelect, onOpen}) => {

  const ref = useRef();

  useEffect(() => {
    isSelected && ref.current.focus()
  }, [isSelected])

  return (
    <StyledIconWithLabel
      ref={ref}
      tabIndex="0"
      onFocus={() => onSelect(true)}
      onBlur={() => onSelect(false)}
      isSelected={isSelected}
      onDoubleClick={onOpen}
      onTouchEnd={onOpen}
      onKeyPress={({key}) => key === 'Enter' && isSelected && onOpen()}
    >
      <Icon src={icon} isSelected={isSelected} />
      <Label isSelected={isSelected}>{title}</Label>
    </StyledIconWithLabel>
  )
}

export const ApplicationIcon = ({application, runtimeProps, isSelected, onSelect}) => {
  const {createTask} = useTaskManager()

  return (
    <IconWithLabel
      icon={application.iconLarge}
      title={application.title}
      isSelected={isSelected}
      onSelect={onSelect}
      onOpen={() => createTask({application, ...runtimeProps})}
    />
  )
}

export default ApplicationIcon
