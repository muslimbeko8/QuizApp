"use client";
import FireworksContainer from "@/components/fireworks";
import { useGetQuestionsQuery } from "@/lib/service/api";
import {
  Workspaces,
  Timer,
  EmojiEvents,
} from "@mui/icons-material";
import Link from "next/link";
import {
  useParams,
  useSearchParams,
} from "next/navigation";
import React, {
  useEffect,
  useState,
} from "react";

const CategoryPage = () => {
  const { id } = useParams();
  const sParams = useSearchParams();
  const [currentTime, setCurrentTime] =
    useState(180);
  const [currentQuestion, setCurrentQuestion] =
    useState(null);
  const [
    currentQuestionCount,
    setCurrentQuestionCount,
  ] = useState(0);
  const [correctAnswers, setCorrectAnswers] =
    useState(0);
  const [showCorrect, setShowCorrect] =
    useState(false);
  const [finish, setFinish] = useState(false);
  const [timeExpired, setTimeExpired] =
    useState(false);
  const [variants, setVariants] = useState(null);

  const { data, isLoading, error } =
    useGetQuestionsQuery({
      category: id,
      difficulty: sParams.get("difficulty"),
    });

  useEffect(() => {
    setCurrentQuestion(data?.results[0]);
    if (data) {
      setVariants(
        shuffle([
          ...data?.results[0].incorrect_answers,
          data?.results[0].correct_answer,
        ])
      );
    }
  }, [data]);

  useEffect(() => {
    let n;
    if (!finish && !timeExpired) {
      n = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(n);
            setTimeExpired(true);
            setFinish(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(n);
    };
  }, [finish, timeExpired]);

  const checkHandler = (answer) => {
    setShowCorrect(true);
    if (
      currentQuestion.correct_answer === answer
    ) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (
      currentQuestionCount <
      data.results.length - 1
    ) {
      const c = currentQuestionCount + 1;
      setCurrentQuestionCount(c);
      setTimeout(() => {
        setCurrentQuestion(data?.results[c]);
        setShowCorrect(false);
        setVariants(
          shuffle([
            ...data?.results[c].incorrect_answers,
            data?.results[c].correct_answer,
          ])
        );
      }, 1000);
    } else {
      setTimeout(() => {
        setFinish(true);
      }, 1000);
    }
  };

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(
        Math.random() * currentIndex
      );
      currentIndex--;
      [array[currentIndex], array[randomIndex]] =
        [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  if (error) {
    return (
      <div className="text-3xl sm:text-5xl text-white text-center pt-10">
        ERROR
      </div>
    );
  }

  const showFireworks =
    finish && correctAnswers > 4 && !timeExpired;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {showFireworks && (
        <FireworksContainer start={true} />
      )}

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Timer
          className={`w-6 h-6 sm:w-8 sm:h-8 ${
            currentTime <= 10
              ? "text-red-500"
              : "text-accent"
          }`}
        />
        <h1
          className={`text-4xl sm:text-6xl lg:text-[7rem] ${
            currentTime <= 10
              ? "text-red-500"
              : ""
          } text-center font-bold`}
        >
          {currentTime / 60 < 10 && "0"}
          {(currentTime / 60) | 0}:
          {currentTime % 60 < 10 && "0"}
          {currentTime % 60}
        </h1>
      </div>

      <form className="relative max-w-[800px] mx-auto border rounded-xl p-4 sm:p-6 lg:p-10 backdrop-blur-md border-accent mt-4 sm:mt-6">
        {isLoading ? (
          <div className="p-6 sm:p-10 text-center">
            <span className="animate-spin inline-block">
              <Workspaces fontSize="large" />
            </span>
          </div>
        ) : finish ? (
          <div className="p-6 sm:p-10 text-center">
            <div className="flex flex-col items-center gap-4">
              {timeExpired ? (
                <h2 className="text-xl sm:text-2xl text-red-500 font-bold">
                  Time's Up!
                </h2>
              ) : (
                <EmojiEvents
                  className={`w-12 h-12 ${
                    correctAnswers > 4
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                />
              )}
              <h1 className="text-lg sm:text-xl font-bold">
                Correct Answers <br />
                <span className="text-3xl sm:text-5xl">
                  {correctAnswers}/
                  {data.results.length}
                </span>
              </h1>
            </div>
            <Link
              className="border border-accent rounded px-4 sm:px-5 py-2 mt-4 sm:mt-5 text-accent inline-block hover:bg-accent hover:text-background transition-colors"
              href={"/"}
            >
              Go to main
            </Link>
          </div>
        ) : (
          <>
            <p className="absolute top-3 end-3 text-accent">
              {currentQuestionCount + 1}/
              {data.results.length}
            </p>
            <h3
              dangerouslySetInnerHTML={{
                __html: currentQuestion?.question,
              }}
              className="text-lg sm:text-xl border-b pb-2 border-accent"
            ></h3>
            <div className="grid mt-4 sm:mt-5 grid-cols-1 sm:grid-cols-2 gap-3">
              {variants &&
                variants.map((q) => (
                  <button
                    onClick={() =>
                      checkHandler(q)
                    }
                    dangerouslySetInnerHTML={{
                      __html: q,
                    }}
                    type="button"
                    className={`p-3 ${
                      showCorrect
                        ? currentQuestion.correct_answer ===
                          q
                          ? "bg-green-500"
                          : "bg-red-500"
                        : "bg-secondary hover:bg-accent"
                    } transition-all font-medium rounded-xl text-sm sm:text-base`}
                    key={q}
                  ></button>
                ))}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CategoryPage;
