import type { Meta, StoryObj } from "@storybook/react";
import { DataSectionCard } from "./DataSectionCard";

const meta = {
  title: "Common/DataSectionCard",
  component: DataSectionCard,
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: { type: "object" },
      description:
        "렌더링할 데이터 섹션 배열입니다. 각 섹션은 `string[]` 또는 `{ label: string, value: string }[]` 형태입니다.",
      table: {
        type: { summary: "Array<string[] | DataPair[]>" }
      }
    }
  }
} satisfies Meta<typeof DataSectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 예시 (기본값 설정)
export const DefaultSectionCard: Story = {
  args: {
    data: [
      // 첫 번째 섹션 (가로 나열)
      [{ label: "김창민", value: "010-1234-5678" }],
      // 두 번째 섹션 (세로 나열)
      ["서울특별시 강서구 00로", "ㅇㅇ아파트 101동 1101호"]
    ]
  }
};

// 다른 스토리 예시 추가 (선택 사항)
export const SingleSectionCard: Story = {
  args: {
    data: [[{ label: "제목", value: "단일 섹션 테스트" }]]
  }
};
