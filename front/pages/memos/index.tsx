import { AxiosError, AxiosResponse } from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { axiosApi } from "../../lib/axios";
import { Loading } from "../../components/Loading";

type Memo = {
  title: string;
  body: string;
};

const Memo: NextPage = () => {
  const router = useRouter();
  // state定義
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { checkLoggedIn } = useAuth();

  // 初回レンダリング時にAPIリクエスト
  useEffect(() => {
    const init = async () => {
      const res: boolean = await checkLoggedIn();
      if (!res) {
        router.push("/");
        return;
      }
      axiosApi
        .get("/api/memos")
        .then((response: AxiosResponse) => {
          console.log(response.data);
          setMemos(response.data.data);
        })
        .catch((err: AxiosError) => console.log(err.response))
        // 画面へのアクセスからメモデータの取得までの間はローディング画面を表示する
        .finally(() => setIsLoading(false));
    };
    init();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-2/3 mx-auto mt-32">
      <div className="w-1/2 mx-auto text-center">
        <button
          className="text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400"
          onClick={() => router.push("/memos/post")}
        >
          メモを追加する
        </button>
      </div>
      <div className="mt-3">
        {/* DBから取得したメモデータの一覧表示 */}
        <div className="grid w-2/3 mx-auto gap-4 grid-cols-2">
          {memos.map((memo: Memo, index) => {
            return (
              <div className="bg-gray-100 shadow-lg mb-5 p-4" key={index}>
                <p className="text-lg font-bold mb-1">{memo.title}</p>
                <p className="">{memo.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Memo;
