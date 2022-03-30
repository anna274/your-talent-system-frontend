import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getPosition } from 'redux/actions';
import { getViewPositionLink, getReturnToUrl, getCandidatesLink } from 'helpers';
import { IRootState } from 'declarations/interfaces';
import { CustomLink } from 'components/shared';
import { PageTitle, PageSubtitle, ControllersContainer } from 'components/shared/page';
import { Candidate } from './sections/Candidate';

interface IParams {
  positionId: string;
  userId: string;
}

export const CandidatesPage: React.FC = () => {
  const position = useSelector((state: IRootState) => state.positions.position);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { positionId, userId } = useParams<IParams>();
  const { search } = useLocation();

  useEffect(() => {
    if (positionId !== position.id) {
      dispatch(getPosition(positionId));
    }
  }, [dispatch]);

  const returnToParam =
    '?returnTo=' + encodeURIComponent(`${getCandidatesLink(userId, positionId)}${search}`);

  return (
    <main>
      <ControllersContainer>
        <CustomLink to={getReturnToUrl(search) || getViewPositionLink(userId, positionId)}>
          Вернуться назад
        </CustomLink>
      </ControllersContainer>

      <PageTitle>Кандидаты на позицию</PageTitle>
      {!!position.id && (
        <>
          {
            <PageSubtitle>
              <strong>Позиция: </strong>
              {`${position.job_function.name} - ${position.project.name}`}
              <CustomLink
                to={`${getViewPositionLink(userId, positionId)}${returnToParam}`}
                classes="inline_link"
              >
                Посмотреть позицию
              </CustomLink>
            </PageSubtitle>
          }
          {position.profiles.length === 0 && !loading && <h3>Кандидатов нет</h3>}
          {position.profiles.map((profile) => (
            <Candidate key={profile.id} profile={profile} position={position} />
          ))}
        </>
      )}
    </main>
  );
};
