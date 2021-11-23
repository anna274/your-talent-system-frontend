import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCandidates, getPosition } from 'redux/actions';
import { getViewPositionLink, getPossibleCandidatesLink } from 'helpers';
import { IRootState } from 'declarations/interfaces';
import { CustomLink } from 'components/shared';
import { PageTitle, PageSubtitle } from 'components/shared/page';
import { Candidate } from './sections/Candidate';

interface IParams {
  positionId: string;
  userId: string;
}

export const PossibleCandidatesPage: React.FC = () => {
  const { data: candidates } = useSelector((state: IRootState) => state.candidates);
  const position = useSelector((state: IRootState) => state.positions.position);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { positionId, userId } = useParams<IParams>();

  useEffect(() => {
    if (positionId !== position.id) {
      dispatch(getPosition(positionId));
    }
    dispatch(getCandidates(positionId));
  }, [dispatch]);

  const returnToParam =
    '?returnTo=' + encodeURIComponent(getPossibleCandidatesLink(userId, positionId));

  return (
    <main>
      <PageTitle>Результаты подбора кандидата</PageTitle>
      {position?.id && (
        <PageSubtitle>
          <strong>Позиция: </strong>
          {`${position?.job_function?.name} - ${position?.project?.name}`}
          <CustomLink
            to={`${getViewPositionLink(userId, positionId)}${returnToParam}`}
            classes="inline_link"
          >
            Посмотреть позицию
          </CustomLink>
        </PageSubtitle>
      )}
      {candidates.length === 0 && !loading && <h3>Кандидатов нет</h3>}
      {candidates.map((candidate) => (
        <Candidate key={candidate.id} candidate={candidate} position={position} />
      ))}
    </main>
  );
};
