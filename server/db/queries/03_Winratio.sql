
-- For Leaderbord and Player Profile

SELECT
  p.name AS player_name,
  COUNT(mp.is_winner) FILTER (WHERE mp.is_winner) AS total_wins,
  COUNT(mp.is_winner) AS total_matches,
  COUNT(mp.is_winner) FILTER (WHERE mp.is_winner) * 100.0 / COUNT(mp.is_winner) AS win_ratio
FROM
  Groups g
  JOIN Groups_Matches gm ON g.id = gm.group_id
  JOIN Matches_Players mp ON gm.match_id = mp.match_id
  JOIN Players p ON mp.player_id = p.id
WHERE
  g.id = <group_id>
GROUP BY
  mp.player_id, p.name;