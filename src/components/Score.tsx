import { FC } from 'react';
import './Score.css';
import { ScoreProps } from '../types/score/ScoreProps';
import { Question } from '../types/question/Question';
import ResultItem from './ResultItem';

const Score: FC<ScoreProps> = ({ questions, userAnswers, result }) => {

	const renderSummary = () => {
		return (
			<header>
				<h2>{result?.remarks}</h2>
				<article className="score-summary">
						<p>You scored:</p>
						<div className="score-number">
								<span>{result?.punctuation.toFixed(2)}%</span>  {/** Round number to 2 decimals */}
						</div>
						<div className="progress-bar">
								<div
										className="progress-fill"
										style={{ width: `${result?.punctuation}%` }}
								></div>
						</div>
				</article>
			</header>
		);
	}

	const renderResultList = () => {
		return (
			<div className="results-list">
					{questions.map((question: Question, index: number) => (
						<ResultItem 
							key={index}
							userAnswers={userAnswers}
							question={question}
							index={index}
						/>
					))}
			</div>
		);
	}

	const renderRetakeButton = () => {
		return (
			<button className="retake-button" onClick={() => window.location.reload()}>
				Retake Quiz
			</button>
		);
	}
	return (
		<section className="score-container">
			{renderSummary()}
			{renderResultList()}
			{renderRetakeButton()}
		</section>
	);
};

export default Score;
