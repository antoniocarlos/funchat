import React, { useMemo } from 'react'
import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useAuthState } from '../../context/auth'
import classNames from 'classnames'


export default function Message({ message }) {

  const { entity } = useAuthState();

  const { sent, received } = useMemo(() => {
    const sent = entity.name === message.sender
    const received = !sent

    return { sent, received }
  }, [message])

  return (
    <div
      className={classNames('d-flex my-3', {
        'ml-auto': sent,
        'mr-auto': received,
      })}
    >
      <OverlayTrigger
        placement={sent ? 'left' : 'right'}
        overlay={
          <Tooltip>
            {`Usuário: ${message.sender} Data: ${moment(message.createdAt).format('MMM DD h:mm a')}`}
          </Tooltip>
        }
        transition={false}
      >
        <div
          className={classNames('py-2 px-3 rounded-pill position-relative', {
            'bg-primary': sent,
            'bg-white': received,
          })}
        >
          <p className={classNames({ 'text-white': sent })} key={message.uuid}>
            {message.content}
          </p>
        </div>
      </OverlayTrigger>
    </div>
  )
}
